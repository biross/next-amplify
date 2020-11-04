import Link from "next/link";
import styles from "./blog.module.css";

import { API } from "aws-amplify";
import { getBlog } from "../../src/graphql/queries";

import BlogConnection from "../../types/BlogConnection";
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
					<Link key={post.id} href={`/blogs/${blog.id}/posts/${post.id}`}>
						<div className={styles.post}>
							<div>{post.title}</div>
							<div>{post.createdAt}</div>
						</div>
					</Link>
				))}
			</div>
		</div>
	);
}

export async function getServerSideProps({ query }) {
	const { bid } = query;
	const blogData = (await API.graphql({
		query: getBlog,
		variables: { id: bid },
	})) as BlogConnection;
	const blog = blogData.data.getBlog;

	return {
		props: { blog },
	};
}
