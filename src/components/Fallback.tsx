export default function Fallback() {
  return (
    <p style={{ color: "red" }}>
      Couldn't find the API key in the environment variables
    </p>
  );
}
