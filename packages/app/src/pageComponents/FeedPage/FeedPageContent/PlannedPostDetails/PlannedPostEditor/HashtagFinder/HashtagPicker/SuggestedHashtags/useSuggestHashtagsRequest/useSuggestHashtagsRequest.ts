import { sleep } from '@/common/sleep';
import { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';

import suggestHashtagsServerAction from './suggestHashtagsServerAction';

type Request = {
  loading: boolean;
  suggestedHashtags: Array<string>;
};

export default (
  caption: string | null,
  { skip }: { skip: boolean }
): Request => {
  const [suggestedHashtags, setSuggestedHashtags] = useState<Array<string>>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const run = async (): Promise<void> => {
      if (skip || !caption || suggestedHashtags.length > 0) {
        return;
      }

      setLoading(true);

      // todo
      // const response = await suggestHashtagsServerAction({
      //   data: { caption },
      // });

      // setLoading(false);

      // if (response.status === `error`) {
      //   toast.error(response.message);
      // } else {
      //   setSuggestedHashtags(response.suggestedHashtags);
      //   console.log(response.suggestedHashtags);
      // }

      await sleep(100);
      setLoading(false);
      setSuggestedHashtags([
        `#TravelInspiration`,
        `#DiscoverParis`,
        `#SeineRiverCruise`,
        `#EiffelTowerMagic`,
        `#LouvreLovers`,
        `#NotreDameDeParis`,
        `#ConciergerieParis`,
        `#MuséeDOrsay`,
        `#StatueOfLibertyParis`,
        `#PontDeGrenelle`,
        `#ParisInOneHour`,
        `#BoatTourParis`,
        `#ParisAdventure`,
        `#ExploreFrance`,
        `#ParisOnTheSeine`,
        `#ParisJourney`,
        `#TravelVloggers`,
        `#FrenchGetaway`,
        `#ParisBoatTour`,
        `#TravelEurope`,
        `#ParisianViews`,
        `#ParisTourist`,
        `#HiddenParis`,
        `#MustSeeParis`,
        `#ParisHighlights`,
        `#IconicParis`,
        `#ParisExperience`,
        `#ParisLifeStyle`,
        `#ParisInSummer`,
        `#LoveParis`,
      ]);
    };
    run();
  }, [caption, skip, suggestedHashtags]);

  return {
    loading,
    suggestedHashtags,
  };
};
