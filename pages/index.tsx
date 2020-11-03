import styles from "./index.module.css";

import { API } from "aws-amplify";
import { listBlogs } from "../src/graphql/queries";

import BlogConnection from "../types/BlogsConnection";
import Blog from "../types/Blog";

export default function Blogs({ blogs }: { blogs: Blog[] }) {
	return (
		<div className={styles.container}>
			<h2>Blogs</h2>
			<div className={styles.blogs}>
				{blogs.map((blog) => (
					<div key={blog.id} className={styles.blog}>
						<div>{blog.name}</div>
						<div>{blog.createdAt}</div>
					</div>
				))}
			</div>
		</div>
	);
}

export async function getServerSideProps() {
	const blogsData = (await API.graphql({ query: listBlogs })) as BlogConnection;
	const blogs = blogsData.data.listBlogs.items;

	return {
		props: { blogs },
	};
}
