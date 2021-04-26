/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import { connect } from 'react-redux';
import '../assets/styles/App.scss';
import Search from '../components/Search';
import Carrousel from '../components/Carrousel/Carrousel';
import Categories from '../components/Categories';
import CarrouselItem from '../components/Carrousel/CarrouselItem';

const Home = ({ myList, trends, originals }) => {
  return (
    <>
      <Search />
      {(myList.length > 0 || undefined) && (
        <Categories title='Tus Favoritos'>
          <Carrousel>
            {myList.map((item) => <CarrouselItem key={item.id * 3.14} item={item} isMyList />)}
          </Carrousel>
        </Categories>
      )}
      <Categories title='Tendencias'>
        <Carrousel>
          {trends.map((item) => <CarrouselItem key={item.id} item={item} />)}
        </Carrousel>
      </Categories>
      <Categories title='Originales de SpaceVideo'>
        <Carrousel>
          {originals.map((item) => <CarrouselItem key={item.id} item={item} />)}
        </Carrousel>
      </Categories>
    </>
  );
};
const mapStateToProps = (state) => {
  return {
    myList: state.myList,
    trends: state.trends,
    originals: state.originals,
  };
};
export default connect(mapStateToProps, null)(Home);
