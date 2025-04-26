import React from "react";
import { GiphyFetch } from "@giphy/js-fetch-api";
import { Grid } from "@giphy/react-components";

const gf = new GiphyFetch("YOUR_GIPHY_API_KEY");

interface GifSelectorProps {
  onSelect: (gif: any) => void;
}

const GifSelector: React.FC<GifSelectorProps> = ({ onSelect }) => {
  const fetchGifs = (offset: number) => gf.trending({ offset, limit: 10 });

  return (
    <Grid
      fetchGifs={fetchGifs}
      width={800}
      columns={3}
      gutter={6}
      onGifClick={(gif, e) => {
        e.preventDefault();
        onSelect(gif);
      }}
    />
  );
};

export default GifSelector;
