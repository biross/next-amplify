import Blog from "./Blog";

export default interface BlogConnection {
	data: {
		getBlog: Blog;
	};
}
