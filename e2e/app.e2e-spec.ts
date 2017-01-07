import { TeamsheetPage } from './app.po';

describe('teamsheet App', function() {
  let page: TeamsheetPage;

  beforeEach(() => {
    page = new TeamsheetPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
