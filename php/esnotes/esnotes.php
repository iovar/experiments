<?php
/*
   Plugin Name: Easy sticky notes
   Description: A simple sticky notes widget.
   Version: 0.1
   Author: John Varouhakis
   Author email: johnvarouhakis@gmail.com
   License: GPLv2
 */


/*
   Copyright 2013 John Varouhakis (email : johnvarouhakis@gmail.com)

   This program is free software; you can redistribute it and/or modify
   it under the terms of the GNU General Public License as published by
   the Free Software Foundation; either version 2 of the License, or
   (at your option) any later version.

   This program is distributed in the hope that it will be useful,
   but WITHOUT ANY WARRANTY; without even the implied warranty of
   MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
   GNU General Public License for more details.

   You should have received a copy of the GNU General Public License
   along with this program; if not, write to the Free Software
   Foundation, Inc., 51 Franklin St, Fifth Floor, Boston, MA 02110-1301 USA
*/



register_activation_hook(__FILE__, 'esnotes_install');
register_deactivation_hook(__FILE__, 'esnotes_uninstall');


function esnotes_install() {
    //wp version check ?
    $esnotes_options_array= array(
            'esnotes_default_bg' => '#ffd500',    //yellow background
            'esnotes_default_fg' => '#000', //black foreground
            'esnotes_default_width' => '-1', //default width is -1 (auto)
            'esnotes_default_min_height' => '100',
            'esnotes_default_max_height' => '200',
            'esnotes_default_anim' => 'none');

    add_option('esnotes_plugin_options', $esnotes_options_array);
}

function esnotes_uninstall() {

    // nothing here, yet

}

add_action('init', 'esnotes_init');
add_action('admin_init', 'esnotes_register_settings');
add_action('admin_menu', 'esnotes_create_settings_submenu');
add_action('widgets_init','esnotes_register_widgets');
add_action( 'wp_enqueue_scripts', 'register_esnotes_plugin_styles' );

function esnotes_init() {
    //localizaton
    load_plugin_textdomain('esnotes-plugin', false,
            plugin_basename(dirname(__FILE__)).'/localization');

}

function register_esnotes_plugin_styles(){
    wp_register_style('esnotes_style', plugins_url('esnotes/css/main.css'));
    wp_enqueue_style('esnotes_style');
}

function esnotes_create_settings_submenu(){

    add_options_page('esNotes Settings Page', 'esNotes Settings',
            'manage_options', 'esnotes_settings_menu', 'esnotes_options_page');

}

function esnotes_register_settings() {

    register_setting('esnotes-settings-group',
            'esnotes_plugin_options',
            'esnotes_sanitize_options');


}

function esnotes_sanitize_options($input, $defaults=null){

    $hex_pat='/^#([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/';
    $numeric_vals = array('esnotes_default_width',
        'esnotes_default_min_height','esnotes_default_max_height');

    if($defaults==null )
        $defaults= get_option('esnotes_plugin_options');
    $output=array();

    if( preg_match($hex_pat, $input['esnotes_default_bg']) ){
        $output['esnotes_default_bg']=$input['esnotes_default_bg'];
    }
    else {
        $output['esnotes_default_bg']=$defaults['esnotes_default_bg'];
    }
    if( preg_match($hex_pat, $input['esnotes_default_fg']) ){
        $output['esnotes_default_fg']=$input['esnotes_default_fg'];
    }
    else {
        $output['esnotes_default_fg']=$defaults['esnotes_default_fg'];
    }

    foreach($numeric_vals as $key){
        if( is_numeric($input[$key]) ){
            $output[$key]="".intval($input[$key]);
        }
        else {
            $output[$key]=$defaults[$key];
        }
    }

    if(in_array($input['esnotes_default_anim'],array( 'none', 'zoom', 'zoom-tilt-left', 'zoom-tilt-right'))){
        $output['esnotes_default_anim']=$input['esnotes_default_anim'];
    }
    else {
        $output['esnotes_default_anim']=$defaults['esnotes_default_anim'];
    }

    return $output;


}

function esnotes_options_page(){
?>
    <div class="wrap">
        <h2>esNotes plugin options</h2>

        <form method="POST" action="options.php">
        <?php settings_fields('esnotes-settings-group'); ?>
        <?php $esnotes_options_array= get_option('esnotes_plugin_options'); ?>
            <table class="form-table">
                <tr valign="top">
                    <th scope="row">Default Background Color</th>
                    <td>
                        <input type="color"
                               name="esnotes_plugin_options[esnotes_default_bg]"
                               value="<?php echo esc_attr($esnotes_options_array['esnotes_default_bg']);  ?>" >
                    </td>
                </tr>
                <tr valign="top">
                    <th scope="row">Default Foreground Color</th>
                    <td>
                        <input type="color"
                               name="esnotes_plugin_options[esnotes_default_fg]"
                               value="<?php echo esc_attr($esnotes_options_array['esnotes_default_fg']);  ?>" >

                    </td>
                </tr>
                <tr valign="top">
                    <th scope="row">Default Width (pixels, 0 or -1 for auto)</th>
                    <td>
                        <input type="number" min="-1" step="1"
                               name="esnotes_plugin_options[esnotes_default_width]"
                               value=<?php echo intval($esnotes_options_array['esnotes_default_width']);  ?> >
                    </td>
                </tr>
                <tr valign="top">
                    <th scope="row">Default Min Height (pixels, 0 or -1 for none)</th>
                    <td>
                        <input type="number" min="-1" step="1"
                               name="esnotes_plugin_options[esnotes_default_min_height]"
                               value=<?php echo intval($esnotes_options_array['esnotes_default_min_height']);  ?> >
                    </td>
                </tr>
                <tr valign="top">
                    <th scope="row">Default Max Height (pixels, 0 or -1 for none)</th>
                    <td>
                        <input type="number" min="-1" step="1"
                               name="esnotes_plugin_options[esnotes_default_max_height]"
                               value=<?php echo intval($esnotes_options_array['esnotes_default_max_height']);  ?> >
                    </td>
                </tr>
                <tr valign="top">
                    <th scope="row">Default Animation on Hover</th>
                    <td>
                        <select name="esnotes_plugin_options[esnotes_default_anim]">
                            <option value="none"
                                <?php selected($esnotes_options_array['esnotes_default_anim'], 'none') ?> >
                                None
                            </option>
                            <option value="zoom"
                                <?php selected($esnotes_options_array['esnotes_default_anim'], 'zoom') ?> >
                                Zoom
                            </option>
                            <option value="zoom-tilt-left"
                                <?php selected($esnotes_options_array['esnotes_default_anim'], 'zoom-tilt-left') ?> >
                                Zoom and Tilt Left
                            </option>
                            <option value="zoom-tilt-right"
                                <?php selected($esnotes_options_array['esnotes_default_anim'], 'zoom-tilt-right') ?> >
                                Zoom and Tilt Right
                            </option>
                        </select>
                    </td>
                </tr>
            </table>
            <p class="submit">
            <input type="submit" class="button-primary"
            value="Save Changes" >
            </p>
        </form>
        <?php
}

class ESNotes_Widget extends WP_Widget{

    function ESNotes_Widget(){
        $widget_options = array(
            'classname'=>'esnotes-widget-class',
            'description' => 'A sticky note widget.'
        );

        $this->WP_Widget('esnotes-widget', 'esNotes Widget', $widget_options);
    }

    function form($instance){
        $esnotes_options_array = get_option('esnotes_plugin_options');
        $defaults = array (
            'bg_color' => $esnotes_options_array['esnotes_default_bg'],
            'fg_color' => $esnotes_options_array['esnotes_default_fg'],
            'width' => $esnotes_options_array['esnotes_default_width'],
            'min_height' => $esnotes_options_array['esnotes_default_min_height'],
            'max_height' => $esnotes_options_array['esnotes_default_max_height'],
            'animation' => $esnotes_options_array['esnotes_default_anim'],

            'note' => ""
        );

        $instance = wp_parse_args( (array)$instance, $defaults);

        $bg_color = $instance['bg_color'];
        $fg_color = $instance['fg_color'];
        $width = $instance['width'];
        $min_height = $instance['min_height'];
        $max_height = $instance['max_height'];
        $animation =  $instance['animation'];

        $note =  $instance['note'];
        ?>
        <p>Background Color:
            <input type="color"
                   name="<?php echo $this->get_field_name( 'bg_color' ); ?>"
                   value="<?php echo esc_attr($bg_color);  ?>" > </p>

        <p>Foreground Color:
            <input type="color"
                   name="<?php echo $this->get_field_name( 'fg_color' ); ?>"
                   value="<?php echo esc_attr($fg_color);  ?>" > </p>

        <p>Width (pixels, 0 or -1 for auto):
            <input type="number" min="-1" step="1"
                   name="<?php echo $this->get_field_name( 'width' ); ?>"
                   value=<?php echo intval($width);  ?> > </p>
        <p>Min Height (pixels, 0 or -1 for none):
            <input type="number" min="-1" step="1"
                   name="<?php echo $this->get_field_name( 'min_height' ); ?>"
                   value=<?php echo intval($min_height);  ?> > </p>
        <p>Max Height (pixels, 0 or -1 for none):
            <input type="number" min="-1" step="1"
                   name="<?php echo $this->get_field_name( 'max_height' ); ?>"
                   value=<?php echo intval($max_height);  ?> > </p>
        <p>Animation:
            <select name="<?php echo $this->get_field_name( 'animation' ); ?>">
                <option value="none"
                    <?php selected($animation, 'none') ?> >
                    None
                </option>
                <option value="zoom"
                    <?php selected($animation, 'zoom') ?> >
                    Zoom
                </option>
                <option value="zoom-tilt-left"
                    <?php selected($animation, 'zoom-tilt-left') ?> >
                    Zoom and Tilt Left
                </option>
                <option value="zoom-tilt-right"
                    <?php selected($animation, 'zoom-tilt-right') ?> >
                    Zoom and Tilt Right
                </option>
            </select>
        </p>
        <p>Note :
            <textarea class="widefat" rows="8"
                name="<?php echo $this->get_field_name( 'note' ); ?>" ><?php
                    echo esc_textarea($note); ?></textarea></p>

        <?php
    }

    function update($new_instance, $old_instance) {

        $instance = $old_instance;

        $new_instance_array= array (
            'esnotes_default_bg' => $new_instance['bg_color'],
            'esnotes_default_fg' => $new_instance['fg_color'],
            'esnotes_default_width' => $new_instance['width'],
            'esnotes_default_min_height' => $new_instance['min_height'],
            'esnotes_default_max_height' => $new_instance['max_height'],
            'esnotes_default_anim' => $new_instance['animation'],

        );
        $old_instance_array= array (
            'esnotes_default_bg' => $old_instance['bg_color'],
            'esnotes_default_fg' => $old_instance['fg_color'],
            'esnotes_default_width' => $old_instance['width'],
            'esnotes_default_min_height' => $old_instance['min_height'],
            'esnotes_default_max_height' => $old_instance['max_height'],
            'esnotes_default_anim' => $old_instance['animation'],
        );

        $sanitized_array = esnotes_sanitize_options($new_instance_array,
                $old_instance_array);

        $instance['bg_color'] = $sanitized_array['esnotes_default_bg'];
        $instance['fg_color'] = $sanitized_array['esnotes_default_fg'];
        $instance['width'] = $sanitized_array['esnotes_default_width'];
        $instance['min_height'] = $sanitized_array['esnotes_default_min_height'];
        $instance['max_height'] = $sanitized_array['esnotes_default_max_height'];
        $instance['animation'] = $sanitized_array['esnotes_default_anim'];
        $instance['note'] = esc_attr($new_instance['note']);

        return $instance;

    }

    function widget($args, $instance) {
        extract($args);
        $bg_color = $instance['bg_color'];
        $fg_color = $instance['fg_color'];
        $width = (intval($instance['width'])>0)? " width: ".$instance['width']."px ;": " ";
        $min_height = (intval($instance['min_height'])>0)? " min-height: ".$instance['min_height']."px ;": " ";
        $max_height = (intval($instance['max_height'])>0)? " max-height: ".$instance['max_height']."px ;": " ";
        $class = ($instance['animation'] !== 'none') ? "class= '".$instance['animation']."' " : "";
        $note = $instance['note'];

        echo $before_widget;

        echo "<div $class style=' background-color: $bg_color; color: $fg_color; $width $min_height $max_height'>$note</div>";


        echo $after_widget;
    }

}

function esnotes_register_widgets(){

    register_widget('ESNotes_Widget');

}
