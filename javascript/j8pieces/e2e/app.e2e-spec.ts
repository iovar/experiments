import { J9piecesPage } from './app.po';

describe('j9pieces App', function() {
  let page: J9piecesPage;

  beforeEach(() => {
    page = new J9piecesPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
