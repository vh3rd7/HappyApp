import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Map, TileLayer, Marker, Popup } from 'react-leaflet';

import { FiPlus, FiArrowRight } from 'react-icons/fi';
import mapMarkerImg from '../images/map-marker.svg';
import '../styles/pages/orphanages-map.css';
import mapIcon from '../utils/mapIcon';
import api from '../services/api';
import Orphanage from './Orphanage';

interface Orphanage {
    id: number;
    name: string;
    latitude: number;
    longitude: number;
}


function OrphanagesMap() {
    const [orphanages, setOrphanages] = useState<Orphanage[]>([]);

    // console.log(orphanages);

    useEffect(() => {
        api.get('orphanages').then(response => {
            // console.log(response.data);
            setOrphanages(response.data);
        });
    }, []);

    return (
        <div id="page-map">
            <aside>
                <header>
                    <img src={mapMarkerImg} alt="Happy" />

                    <h2>Escolha um orfanato no mapa</h2>
                    <p>Muitas crianças estão esperando a sua visita :)</p>
                </header>
                <footer>
                    <strong>Rio de Janeiro</strong>
                    <span>Rio de Janeiro</span>
                </footer>
            </aside>

            <Map
                center={[-22.9063973, -43.2520676]}
                zoom={12}
                style={{ width: '100%', height: '100%' }}
            >
                {/*<TileLayer url="https://a.tile.openstreetmap.org/{z}/{x}/{y}.png" />*/}
                <TileLayer
                    url={`https://api.mapbox.com/styles/v1/mapbox/light-v10/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`}
                />
                
                {/* {console.log(orphanages)} */}
                {
                orphanages.map(orphanage => {
                    return (
                        <Marker 
                        key={orphanage.id}
                        icon={mapIcon}
                        position={[orphanage.latitude, orphanage.longitude]} 
                        >
    
                        <Popup 
                            closeButton={false} className="map-popup"
                            minWidth={240} maxWidth={240}>
                            {orphanage.name}
                            <Link to={`/orphanages/${orphanage.id}`}>
                                
                                <FiArrowRight size={20} color="#fff"/>
                            </Link>
                        </Popup>
    
                    </Marker>
                    )
                })
                }

            </Map>

            <Link to='/orphanages/create' className='create-orphanage'>
                <FiPlus size={32} color='#FFF' />
            </Link>
        </div>
    );
}

export default OrphanagesMap;