import React, {useState, useEffect} from "react";
import {connect} from "react-redux";
import styled from "styled-components";
import {pickUpSupplies} from "../../redux/actions";
import {SPRITE_SIZE} from "../../constants";
import grass from "../../assets/walkable/grass.png";
import SuppliesPopup from "../../components/SuppliesPopup";
import {tiles} from "../../data/maps/1";


const MapBackground = styled.div`
    background-image: url(${grass});
`;


//player and pickUpSupplies needed
function Map(props) {
    return (
        <MapBackground>
            {tiles.map((row, i) => (
                <MapRow
                    key={i}
                    row={row}
                    player={props.player}
                    pickUpSupplies={props.pickUpSupplies}
                />
            ))}
        </MapBackground>
    );
}

function MapRow(props) {
    return (
        <div className="row">
            {props.row.map((tile, i) => (
                <MapTile
                    key={i}
                    tile={tile}
                    player={props.player}
                    pickUpSupplies={props.pickUpSupplies}
                />
            ))}
        </div>
    );
}


const TilesStyle = styled.div`
    height: ${SPRITE_SIZE}px;
    width: ${SPRITE_SIZE}px;
`;

//This will check to see if player is in correct position to pick up supploes
function MapTile(props) {
    const {player, tile, pickUpSupplies} = props;
    // if getTileSprite(props.tile) === supplies1
    // && player position around to supplies
    // add locations food_available and water_available
    // if getTileSprite(props.tile) === supplies2
    // && player position around to supplies
    // add locations food_available2 and water_available2
    // trigger popup, positioned absolutely above tile
    // ok to close popup
    //   console.log(props.tile);
    useEffect(() => {
        const arriveFirstStore = getTileSprite(tile) === "supplies1" && player.position[0] === 300 && player.position[1] === 420
        const arriveSecondStore = getTileSprite(tile) === "supplies2" && player.position[0] === 840 && player.position[1] === 180
        if (arriveFirstStore || arriveSecondStore) {
            pickUpSupplies(player.food_available, player.water_available);
            setPopup(true)

            if (arriveFirstStore) setPopup([true, false])
            else if (arriveSecondStore) setPopup([false, true])
        } else setPopup(false)
    }, [player.position]);

    const [popup, setPopup] = useState([false, false]);

    return (
        <>
            <TilesStyle className={`tile ${getTileSprite(tile)}`}/>
            {popup[0] === true ?
                (
                    <SuppliesPopup
                        location={player.location}
                        food={player.food_available}
                        water={player.water_available}
                    />
                ) : null}
            {popup[1] === true ? (
                <SuppliesPopup
                    location={player.location_2}
                    food={player.food_available2}
                    water={player.water_available2}
                />
            ) : null}
        </>
    );
}


function getTileSprite(type) {
    switch (type) {
        case 0:
            return "grass";
        case 1:
            return "road";
        case 2:
            return "dirt";
        case 3:
            return "floor";
        case 4:
            return "water";
        case 5:
            return "tree";
        case 6:
            return "wall";
        case 7:
            return "fence";
        case 8:
            return "supplies1";
        case 9:
            return "supplies2";
        default:
            return "";
    }
}


const mapStateToProps = state => {
    return {
        ...state
    };
};

export default connect(mapStateToProps, {pickUpSupplies})(Map);
