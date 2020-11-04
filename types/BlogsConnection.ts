import Blog from "./Blog";

export default interface BlogsConnection {
	data: {
		listBlogs: {
			items: Blog[];
			nextToken: String;
		};
	};
}
