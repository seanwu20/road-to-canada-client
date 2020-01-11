import React, {useState, useEffect} from "react";
import {connect} from "react-redux";
import styled from "styled-components";
import {pickupSupplies} from "../../redux/actions";
import {SPRITE_SIZE} from "../../constants";
import grass from "../../assets/walkable/grass.png";
import Supplies from "../../components/Supplies";
import {tiles} from "../../data/maps/1";


const MapBackground = styled.div`
    width: "1260px";
    height: "600px";
    background-image: url(${grass});
`;

function Map(props) {
    return (
        <MapBackground>
            {tiles.map((row, i) => (
                <MapRow
                    key={i}
                    tiles={row}
                    player={props.player}
                    pickupSupplies={props.pickupSupplies}
                />
            ))}
        </MapBackground>
    );
}

function MapRow(props) {
    return (
        <div className="row">
            {props.tiles.map((tile, i) => (
                <MapTile
                    key={i}
                    tile={tile}
                    player={props.player}
                    pickupSupplies={props.pickupSupplies}
                />
            ))}
        </div>
    );
}


const SuppliesPopup = styled.div`
  width: 100%;
  position: absolute;
  left: 0;
  top: 0;
  background: rgba(3, 3, 3, 0.85);
  border: 3px solid #888;
`;

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

function MapTile(props) {
    const {player, tile, pickupSupplies} = props;
    const [redeemed, setRedeem] = useState(false);
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
        if (
            !redeemed &&
            getTileSprite(tile) === "supplies1" &&
            player.position[0] === 300 &&
            player.position[1] === 420
        ) {
            //   console.log("pick up supplies");
            console.log("redeemed", redeemed);
            pickupSupplies(player.food_available, player.water_available);
            //   setRedeem(true);
            //   console.log(pickupSupplies);
        }
        if (
            !redeemed &&
            getTileSprite(tile) === "supplies2" &&
            player.position[0] === 840 &&
            player.position[1] === 180
        ) {
            //   console.log("pick up supplies");
            pickupSupplies(player.food_available2, player.water_available2);
            //   setRedeem(true);
        }
        console.log("FIRED");
    }, [player.position]);

    return (
        <>
            {getTileSprite(tile) === "supplies1" &&
            player.position[0] === 300 &&
            player.position[1] === 420 ? (
                <SuppliesPopup>
                    <Supplies
                        redeemed={redeemed}
                        location={player.location}
                        food={player.food_available}
                        water={player.water_available}
                    />
                </SuppliesPopup>
            ) : null}
            {getTileSprite(tile) === "supplies2" &&
            player.position[0] === 840 &&
            player.position[1] === 180 ? (
                <SuppliesPopup>
                    <Supplies
                        redeemed={redeemed}
                        location={player.location_2}
                        food={player.food_available2}
                        water={player.water_available2}
                    />
                </SuppliesPopup>
            ) : null}

            <div
                className={`tile ${getTileSprite(tile)}`}
                style={{
                    height: SPRITE_SIZE,
                    width: SPRITE_SIZE
                }}
            ></div>
        </>
    );
}




const mapStateToProps = state => {
    return {
        ...state
    };
};

export default connect(mapStateToProps, {pickupSupplies})(Map);
