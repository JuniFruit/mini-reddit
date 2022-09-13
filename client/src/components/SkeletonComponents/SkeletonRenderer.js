import './Skeleton.css'


export const SkeletonRenderer = (props) => {

 

    const renderContent = () => {
        const {amount = 1} = props;
        if (amount < 1) return;

        const array = new Array(amount);
        const node = props.children

        return array.fill(node).map(node => node);
    }

   

    return (
        <>
            {renderContent()}
        </>
    )
}