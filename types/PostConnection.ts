import Blog from "./Blog";

export default interface PostConnection {
	data: {
		getPost: Blog;
	};
}
