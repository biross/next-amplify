import { useState, useEffect } from "react";

import Link from "next/link";
import styles from "./index.module.css";

import { API } from "aws-amplify";
import { listBlogs } from "../src/graphql/queries";

import BlogConnection from "../types/BlogsConnection";
import Blog from "../types/Blog";

export default function BlogsComponent() {
	const [blogs, setBlogs] = useState<Blog[]>([]);

	const fetchBlogs = async () => {
		const blogsData = (await API.graphql({
			query: listBlogs,
		})) as BlogConnection;
		const blogs = blogsData.data.listBlogs.items;

		setBlogs(blogs);
	};

	useEffect(() => {
		fetchBlogs();
	}, []);

	return (
		<div className={styles.container}>
			<h2>Blogs</h2>
			<div className={styles.blogs}>
				{blogs.map((blog) => (
					<Link key={blog.id} href={`/blogs/${blog.id}`}>
						<div className={styles.blog}>
							<div>{blog.name}</div>
							<div>{blog.createdAt}</div>
						</div>
					</Link>
				))}
			</div>
		</div>
	);
}
