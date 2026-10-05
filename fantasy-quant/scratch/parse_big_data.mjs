import fs from 'fs';
const text = fs.readFileSync('scratch/big_data.json', 'utf-8');
const data = JSON.parse(text);

console.log('Props top keys:', Object.keys(data));
if (data.props) {
  console.log('Props keys:', Object.keys(data.props));
  if (data.props.pageProps) {
    console.log('pageProps keys:', Object.keys(data.props.pageProps));
    const pageProps = data.props.pageProps;
    if (pageProps.dehydratedState) {
        console.log('Queries:', pageProps.dehydratedState.queries.length);
        const q = pageProps.dehydratedState.queries[0];
        console.log('query keys', Object.keys(q));
    }
  }
}
