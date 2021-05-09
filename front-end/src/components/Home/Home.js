import React,{ useState } from 'react';
import Channels from '../Channels/Channels'
import Channel from '../Channels/Channel'
import Welcome from '../Welcome'
import "./Home.css"

function Home(props) {
    const [channel, setChannel] = useState(null)
    const fetchChannel = async (channel) => {
        setChannel(channel)
    }

    return (
        <main>
            <div className="row">
                <div className="col-6">
                    <Channels onChannel={fetchChannel} />
                </div>
                <div className="col-6">
                    {channel ? <Channel channel={channel} messages={[]} /> : <Welcome />}
                </div>
            </div>
        </main>
    );
}

export default Home;