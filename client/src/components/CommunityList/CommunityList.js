import { CommunityCard } from "./CommunityCard"
import './CommunityList.css'

export const CommunityList = ({ communities = [] }) => {


    const renderCommunityCards = () => {

        /* eslint-disable */

        const dataToRender = [].concat(communities)
        return dataToRender.map(child => {
            if (!child) return;
            return <CommunityCard

                name_prefixed={child.data.display_name_prefixed}
                description={child.data.description}
                url={child.data.url}
                community_icon={child.data.community_icon}
                icon_img={child.data.icon_img}
                members={child.data.subscribers}
            />
        })
    }


    return (
        <div className="communityList-container">
            {renderCommunityCards()}
        </div>




    )
}