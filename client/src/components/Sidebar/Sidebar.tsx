import { useQuery } from "@apollo/client";
import { SelectableChannel } from "../SelectableChannel/SelectableChannel";
import "./index.css";
import { GET_ALL_CHANNEL } from "../../query";
import { Dispatch, useEffect, useState } from "react";
import { ChannelType } from "../../types";
import { Link, useLocation } from "react-router-dom";

export function Sidebar({
  setSelectedChannelId,
  handleClickChannel,
}: {
  setSelectedChannelId: Dispatch<string>;
  handleClickChannel: (channelId: string | undefined) => void;
}) {
  const [channels, setChannels] = useState<ChannelType[]>();
  const location = useLocation();
  const userPage = location.state.user;
  //TODO type for data
  const { loading, data, error } = useQuery(GET_ALL_CHANNEL, {
    //TODO to optimize the fetching
    fetchPolicy: "no-cache",
  });
  useEffect(() => {
    if (data) {
      /* chatUserItemsVar(data.Users); */

      setChannels(data.Channels);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [JSON.stringify(data?.Channels)]);
  //TODO add image for the channels with external storage
  return (
    <>
      {loading && <div>loading</div>}
      {error && <div>{error.message}</div>}
      {data && <>{console.log("data collected")} </>}

      <header className="user-info">
        <span>User : {userPage}</span>
        <Link
          to={{
            pathname: "/",
          }}
          state={userPage}
        >
          Login
        </Link>
      </header>

      <div className="sidebar">
        {channels?.map(({ title, id }: ChannelType, index: number) => (
          //pass the entire channel ?
          <SelectableChannel
            key={index}
            title={title}
            channelId={id}
            setSelectedChannelId={setSelectedChannelId}
            handleClickChannel={handleClickChannel}
          />
        ))}
      </div>
    </>
  );
}
