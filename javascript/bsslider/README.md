bsslider
========

bsSlider is an extremely simple slider for jQuery and Bootstrap 3


Use it like this:

    $([selector]).slider(opts);

to create a slider within all macthed elements.

Opts can either be:
a) An object with the attributes [val] and [barColor], both optional. 
The first is a number from 0 to 100 and sets the value of the slider, 
while the second is any valid css color description. Default value is 50, 
while default color is #557. 
b) A number from 0 to 100 , that is used as the value of the slider.


Once an element has slider() called upon it, any subsequent calls will modify 
the existing slider's value and color.

So, calling:

    $([selector]).slider(10);

on any element that has a slider created in it, 
will set the sliders value to 10.

You can also set the color of the slider after creation, by calling slider() and 
passing an object containing a [barColor] attribute as an argument, just like 
when creating the slider.



To retrieve the values stored in the sliders, you have two options:

i) Call:

    $([selector]).slider("get");

and retrieve an array of values from all the matching elements.

ii) The preferred way, which is to attach an event handler on the slider 
container (the element that you initially called .slider() upon) and listen for 
the 'slider.newValue' event. This eventis fired any time a value is set, either
explicitly, by calling slider(val) on an existing slider, or following user 
input, right after the mouseup event. The event handler needs to take two 
arguments, the first being the event object and the second an object that 
contains the new value in a attribute named [val].

So, for example, binding as in the folowing example, will log all value changes 
on the console :

    $(".slider").on('slider.newValue', function(evt,data){
        console.log("New value is", data.val );
    });





