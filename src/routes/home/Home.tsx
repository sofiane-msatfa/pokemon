import { Link } from "react-router-dom";

export default function Home() {
  return (
    <main>
      <h1>Pokemon</h1>
      <Link to="/catalogue">Catalogue</Link>
    </main>
  );
}
