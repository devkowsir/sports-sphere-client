import { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { SiteName } from "../../config";

export const NotFound = () => {
  const { state } = useLocation();
  let { redirectTo, redirectLabel } = state ?? {};

  if (!redirectLabel || !redirectTo) {
    redirectLabel = "Back to Home";
    redirectTo = "/";
  }

  useEffect(() => {
    document.title = `${SiteName} | Not Found`;
  }, []);

  return (
    <section className="my-12">
      <div className="text-center">
        <div className="flex justify-center items-center text-9xl text-primary font-display">
          <span>4</span>
          <span className="text-secondary">0</span>
          <span>4</span>
        </div>
        <h1 className="mb-4 text-2xl font-display font-semibold">Page not found!</h1>
        <Link to={redirectTo} className="btn btn-outline">
          {redirectLabel}
        </Link>
      </div>
    </section>
  );
};
