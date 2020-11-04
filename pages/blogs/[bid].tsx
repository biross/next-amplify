import styles from "./blog.module.css";

import { API } from "aws-amplify";
import { getBlog } from "../../src/graphql/queries";
import { listBlogs } from "../../src/graphql/queries";

import BlogConnection from "../../types/BlogConnection";
import BlogsConnection from "../../types/BlogsConnection";
import Blog from "../../types/Blog";

export default function BlogComponent({ blog }: { blog: Blog }) {
	return (
		<div className={styles.container}>
			<div>
				<h2 className={styles.title}>{blog.name}</h2>
				<div className={styles.info}>{blog.id}</div>
				<div className={styles.info}>{blog.createdAt}</div>
			</div>
			<div className={styles.posts}>
				<h2>Posts</h2>
				{blog.posts.items.map((post) => (
					<div key={post.id} className={styles.post}>
						<div>{post.title}</div>
						<div>{post.createdAt}</div>
					</div>
				))}
			</div>
		</div>
	);
}

export async function getStaticPaths() {
	const blogsData = (await API.graphql({
		query: listBlogs,
	})) as BlogsConnection;
	const blogs = blogsData.data.listBlogs.items;

	return {
		paths: blogs.map(({ id }) => ({ params: { bid: id } })),
		fallback: false,
	};
}

export async function getStaticProps({ params }) {
	const { bid } = params;
	const blogData = (await API.graphql({
		query: getBlog,
		variables: { id: bid },
	})) as BlogConnection;
	const blog = blogData.data.getBlog;

	return {
		props: { blog },
	};
}
