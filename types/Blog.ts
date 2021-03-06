import Post from "./Post";

export default interface Todo {
	id: string;
	name: string;
	createdAt: string;
	updatedAt: string;

	posts: {
		items: Post[];
	};
}
