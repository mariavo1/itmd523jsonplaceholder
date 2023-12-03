"use client";
import { useEffect, useRef, useState } from "react";

const BASE_URL = "https://jsonplaceholder.typicode.com";

interface Post {
  id: number;
  title: string;
}

export default function Index() {
  const [error, setError] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [posts, setPosts] = useState<Post[]>([]);
  const [page, setPage] = useState(0);

  const abortController = useRef<AbortController | null>(null);

  useEffect(() => {
    const fetchPages = async () => {
      abortController.current?.abort();
      abortController.current = new AbortController();

      setIsLoading(true);

      try {
        const response = await fetch(`${BASE_URL}/posts?page=${page}`, {
          signal: abortController.current?.signal,
        });
        const posts = (await response.json()) as Post[];
        setPosts(posts);
      } catch (e: any) {
        if (e.name === "AbortError") {
          console.log("Aborted");
          return;
        }

        setError(e);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPages();
  }, [page]);

  if (error) {
    return <div>ERROR! Please try again.</div>;
  }

  return (
    <div>
      <h1 className="text-center mb-5 mt-10 text-3xl capitalize">Data fetching in react using jsonplaceholder</h1>
      <div className="flex items-center justify-center">
        <button className="mb-10 text-2xl bg-orange-100 rounded-full px-5 py-3 cursor-pointer" onClick={() => setPage(page + 1)}>Click to Increase Page ({page})</button>
      </div>
      {isLoading && <div>Loading...</div>}
      {!isLoading && (
        <ul>
          {posts.map((post) => {
            return <li className="flex items-center justify-center" key={post.id}>{post.title}</li>;
          })}
        </ul>
      )}
    </div>
  );
}