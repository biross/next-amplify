import styles from "./index.module.css";

import { API, graphqlOperation } from "aws-amplify";
import { listBlogs } from "../src/graphql/queries";

import BlogConnection from "../types/BlogsConnection";
import Blog from "../types/Blog";

export default function Blogs({ blogs }: { blogs: Blog[] }) {
	return (
		<div className={styles.container}>
			<h2>Blogs</h2>
			<div className={styles.blogs}>
				{blogs.map((blog) => {
					blog.id;
				})}
			</div>
		</div>
	);
}

export async function getServerSideProps() {
	const blogsData = (await API.graphql(
		graphqlOperation(listBlogs)
	)) as BlogConnection;
	const blogs = blogsData.data.listBlogs.items;

	return {
		props: { blogs },
	};
}
