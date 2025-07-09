import Navbar from './Navbar';


export default function Layout({ user, children }) {
  return (
    <>
      <Navbar user={user} />
      <main className="p-4">{children}</main>
    
    </>
  );
}
