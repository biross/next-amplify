import styles from "./blog.module.css";

import { API } from "aws-amplify";
import { getPost } from "../../../src/graphql/queries";

import PostConnection from "../../../types/PostConnection";
import Post from "../../../types/Post";

export default function PostComponent({ post }: { post: Post }) {
	return (
		<div className={styles.container}>
			<div>
				<h2 className={styles.title}>{post.title}</h2>
				<div className={styles.info}>{post.id}</div>
				<div className={styles.info}>{post.createdAt}</div>
			</div>
		</div>
	);
}

export async function getServerSideProps({ query }) {
	const { pid } = query;
	const postData = (await API.graphql({
		query: getPost,
		variables: { id: pid },
	})) as PostConnection;
	const post = postData.data.getPost;

	return {
		props: { post },
	};
}
