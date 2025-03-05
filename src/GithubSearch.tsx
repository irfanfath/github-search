import { useState } from "react";
import axios from "axios";
import Card from "./components/ui/Card";
import FormInput from "./components/ui/FormInput";

const GitHubSearch = () => {
    const [query, setQuery] = useState("");
    const [users, setUsers] = useState<any[]>([]);
    const [expandedUser, setExpandedUser] = useState<string | null>(null);
    const [repos, setRepos] = useState<{ [key: string]: any[] }>({});
    const [loading, setLoading] = useState(false);
    const [loadingRepo, setLoadingRepo] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const searchUsers = async () => {
        if (!query.trim()) return;
        setLoading(true);
        setError(null);
        setUsers([]);
        setRepos({});
        try {
            const response = await axios.get(`https://api.github.com/search/users?q=${query}&per_page=5`);
            setUsers(response.data.items || []);
        } catch (err) {
            setError("Failed to fetch users");
        } finally {
            setLoading(false);
        }
    };

    const fetchRepos = async (username: string) => {
        if (repos[username]) {
            setExpandedUser(expandedUser === username ? null : username);
            return;
        }
        setLoadingRepo(true);
        setError(null);
        try {
            const response = await axios.get(`https://api.github.com/users/${username}/repos`);
            setRepos((prevRepos) => ({ ...prevRepos, [username]: response.data || [] }));
            setExpandedUser(username);
        } catch (err) {
            setError("Failed to fetch repositories");
        } finally {
            setLoadingRepo(false);
        }
    };

    return (
        <div className="p-4 max-w-lg mx-auto">
            <FormInput
                type="text"
                placeholder="Search GitHub users"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && searchUsers()}
            />
            <button className="mt-2 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 disabled:bg-gray-400 w-full" onClick={searchUsers} disabled={loading}>
                {loading ? "Searching..." : "Search"}
            </button>
            {error && <p className="text-red-500 mt-2">{error}</p>}
            {users.length > 0 && <div className="mt-2 text-gray-500">showing users for {query} </div>}
            <div className="mt-4">
            {loadingRepo && <div className="text-gray-500">Please wait loading repository list...</div>}
                {users.map((user) => (
                    <div key={user.id} className="border rounded-lg mb-2">
                        <button
                            className="w-full p-2 flex justify-between items-center bg-gray-100"
                            onClick={() => fetchRepos(user.login)}
                        >
                            <div className="flex items-center gap-2">
                                <img src={user.avatar_url} alt={user.login} className="w-10 h-10 rounded-full" />
                                <p>{user.login}</p>
                            </div>
                            <span>{expandedUser === user.login ? "▲" : "▼"}</span>
                        </button>

                        {expandedUser === user.login && repos[user.login] && (
                            <div className="p-2 border-t">
                                {repos[user.login].length > 0 ? (
                                    repos[user.login].map((repo) => (
                                        <Card key={repo.id}>
                                            <div className="inline-flex justify-between w-full gap-4">
                                                <a href={repo.html_url} target="_blank" rel="noopener noreferrer" className="text-blue-500">
                                                    {repo.name}
                                                </a>
                                                <div>
                                                    {repo.stargazers_count}⭐
                                                </div>
                                            </div>
                                        </Card>
                                    ))
                                ) : (
                                    <p className="text-gray-500">No repositories found</p>
                                )}
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default GitHubSearch;
