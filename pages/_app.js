import "../styles/globals.css";
import "@aws-amplify/ui/dist/style.css";

import { Amplify } from "aws-amplify";
import { withAuthenticator } from "aws-amplify-react";
import awsExports from "../src/aws-exports";
Amplify.configure({ ...awsExports, ssr: true });

function MyApp({ Component, pageProps }) {
	return <Component {...pageProps} />;
}

export default withAuthenticator(MyApp, true);
