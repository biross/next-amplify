import { useState, useEffect } from "react";
import { useRouter } from "next/router";

import { API } from "aws-amplify";
import { getBlog } from "../../src/graphql/queries";

import styles from "./blog.module.css";

import BlogConnection from "../../types/BlogConnection";
import Blog from "../../types/Blog";

export default function BlogComponent() {
	const [blog, setBlog] = useState<Blog>();
	const router = useRouter();

	const fetchBlog = async (id) => {
		if (id) {
			const blogData = (await API.graphql({
				query: getBlog,
				variables: { id },
			})) as BlogConnection;
			const blog = blogData.data.getBlog;

			setBlog(blog);
		}
	};

	useEffect(() => {
		fetchBlog(router.query.bid);
	}, [router.query.bid]);

	return (
		<div className={styles.container}>
			{blog && (
				<>
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
				</>
			)}
		</div>
	);
}
