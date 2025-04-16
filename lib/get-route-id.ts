export default function getId(pathname: string) {
  let routes = pathname.split("/");
  return routes[routes.length - 1];
}
