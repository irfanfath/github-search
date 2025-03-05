import { useState } from "react";
import axios from "axios";
import Button from "./components/ui/Button";
import Card from "./components/ui/Card";
import FormInput from "./components/ui/FormInput";

const GitHubSearch = () => {
  const [query, setQuery] = useState("");
  const [users, setUsers] = useState([]);
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const searchUsers = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(`https://api.github.com/search/users?q=${query}&per_page=5`);
      setUsers(response.data.items);
    } catch (err) {
      setError("Failed to fetch users");
    } finally {
      setLoading(false);
    }
  };

  const fetchRepos = async (username: string) => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(`https://api.github.com/users/${username}/repos`);
      setRepos(response.data);
    } catch (err) {
      setError("Failed to fetch repositories");
    } finally {
      setLoading(false);
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
      <Button className="mt-2" onClick={searchUsers} disabled={loading}>
        {loading ? "Searching..." : "Search"}
      </Button>
      {error && <p className="text-red-500">{error}</p>}
      <div className="mt-4">
        {users.map((user: any) => (
          <Card key={user.id} onClick={() => fetchRepos(user.login)}>
            <div className="flex items-center gap-2">
              <img src={user.avatar_url} alt={user.login} className="w-10 h-10 rounded-full" />
              <p>{user.login}</p>
            </div>
          </Card>
        ))}
      </div>
      <div className="mt-4">
        {repos.map((repo: any) => (
          <Card key={repo.id}>
            <a href={repo.html_url} target="_blank" rel="noopener noreferrer">
              {repo.name}
            </a>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default GitHubSearch;
