// OpenSearch Description
// Allows users to add your site as a search engine

const BASE_URL = 'https://bharatchandra.me';

const openSearchXML = `<?xml version="1.0" encoding="UTF-8"?>
<OpenSearchDescription xmlns="http://a9.com/-/spec/opensearch/1.1/">
  <ShortName>Bharat Chandra</ShortName>
  <Description>Search Bodapati Bharat Chandra's portfolio, projects, and blog</Description>
  <Tags>portfolio developer ai ml</Tags>
  <Contact>bc833498@gmail.com</Contact>
  <Url type="text/html" template="${BASE_URL}/blog?q={searchTerms}"/>
  <Url type="application/rss+xml" template="${BASE_URL}/rss.xml"/>
  <Url type="application/atom+xml" template="${BASE_URL}/atom.xml"/>
  <Image height="64" width="64" type="image/png">${BASE_URL}/icon-64.png</Image>
  <Image height="16" width="16" type="image/x-icon">${BASE_URL}/favicon.ico</Image>
  <Query role="example" searchTerms="fastapi" />
  <Developer>Bodapati Bharat Chandra</Developer>
  <Attribution>Copyright ${new Date().getFullYear()} Bodapati Bharat Chandra</Attribution>
  <SyndicationRight>open</SyndicationRight>
  <AdultContent>false</AdultContent>
  <Language>en-IN</Language>
  <Language>en</Language>
  <OutputEncoding>UTF-8</OutputEncoding>
  <InputEncoding>UTF-8</InputEncoding>
</OpenSearchDescription>`;

export async function GET() {
  return new Response(openSearchXML, {
    headers: {
      'Content-Type': 'application/opensearchdescription+xml; charset=utf-8',
      'Cache-Control': 'public, max-age=86400'
    }
  });
}
