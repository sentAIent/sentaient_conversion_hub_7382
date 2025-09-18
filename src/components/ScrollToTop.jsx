import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import ScrollToTop from './components/ScrollToTop';

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

<<<<<<< HEAD
export default ScrollToTop;
=======
export default ScrollToTop;
>>>>>>> 541aa3f144aaccb049d88a23d56b68a6f7fcef61
