import { useState, useEffect } from "react";

const CAT_PREFIX_IMG_URL = "https://cataas.com/cat";
const PLACEHOLDER_URL = "https://via.placeholder.com/400?text=Loading...";

export const useRandomCatImg = ({ fact }) => {
  const [imgURL, setImgURL] = useState(PLACEHOLDER_URL);

  useEffect(() => {
    if (!fact) return;

    const threeFirstWords = fact.split(" ").slice(0, 3).join("%20");
    const url = `${CAT_PREFIX_IMG_URL}/says/${threeFirstWords}?width=400&height=400`;
    setImgURL(url);

    fetch(url)
      .then((res) => {
        if (!res.ok) {
          throw new Error("Network response was not ok");
        }
      })
      .catch(() => {
        fetch(`${CAT_PREFIX_IMG_URL}/says/${threeFirstWords}?json=true`)
          .then((res) => res.json())
          .then((data) => {
            const { _id } = data;
            const fallbackUrl = `${CAT_PREFIX_IMG_URL}/${_id}/says/${threeFirstWords}?width=400&height=400`;
            setImgURL(fallbackUrl);
          })
          .catch(() => {
            setImgURL(PLACEHOLDER_URL);
          });
      });
  }, [fact]);

  return { imgURL };
};
