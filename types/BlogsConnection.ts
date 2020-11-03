import Blog from "./Blog";

export default interface TodoConnection {
	data: {
		listBlogs: {
			items: Blog[];
			nextToken: String;
		};
	};
}
