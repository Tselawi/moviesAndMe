import React from 'react'
import { StyleSheet, View, Button, TextInput, FlatList, Text, ActivityIndicator } from 'react-native'
import FilmItem from './FilmItem'
import {getFilmsFromApiWithSearchedText} from '../API/TMDBApi'
import { connect } from 'react-redux'

class Search extends React.Component {

  constructor(props) {
    super(props)
    this.page= 0 // Compteur pour connaître la page courante
    this.totalPages=0 // Nombre de pages totales pour savoir si on a atteint la fin des retours de l'API TMDB
    this.searchedText = "" // Initialisation de notre donnée searchedText en dehors du setState
    this.state = {
      films: [],
      isLoading: false // par défaut à false car il n'y a pas de chargement tant qu'on

    }
  }

 _loadFilms() {
   if (this.searchedText.length > 0) {
     this.setState({ isLoading: true }) // lancement du chargement
    getFilmsFromApiWithSearchedText(this.searchedText, this.page+1).then(data => {
      this.page= data.page
      this.totalPages = data.total_pages
      this.setState({
        films: [ ...this.state.films, ...data.results ],
        //films: this.state.films.concat(data.results), ça functionne comme le sytaxe au dessus
        //on a utilisé la syntaxe ... devant un objet, qui permet de créer une copie de cet objet.
        isLoading: false // Arrêt du chargement
      })
     })
    }
  }

_displayLoading() {
  if (this.state.isLoading){
    return (
      <View style={styles.loading_container}>
      <ActivityIndicator size='large' />
      </View>
    )
  }
}

_searchFilms() {
   this.page= 0
   this.totalPages= 0
   this.setState({
     films: [],
   }, () => {
   // console.log('Page :' + this.page + ' / TotalPages : ' + this.totalPages + ' / Nombre de films : ' + this.state.films.length)
   this._loadFilms()
 })
}


_displayDetailForFilm = (idFilm) => {
  //console.log('Display film with id ' + idFilm);
  console.log("Display film with id " + idFilm)
  this.props.navigation.navigate('FilmDetail', { idFilm: idFilm })
}


_searchTextInputChanged(text) {
  this.searchedText = text
}
  render() {
    //console.log(this.state.isLoading);
    //console.log(this.props)
    return (
      <View style={styles.main_container}>
          <TextInput
            style={styles.textinput}
            placeholder="Titre du film"
            onChangeText={(text) => this._searchTextInputChanged(text)}
            onSubmitEditing= {() => this._loadFilms()}
          />
          <Button
            title="Rechercher"
            onPress={() => this._searchFilms()}
          />
          <FlatList
            data={this.state.films}
            extraData = {this.props.favoritesFilm}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({item}) =>
             <FilmItem
                film={item}
                isFilmFavorite= {(this.props.favoritesFilm.findIndex(film => film.id === item.id) !== -1) ? true : false}
                displayDetailForFilm={this._displayDetailForFilm}

             />
            }
            onEndReachedThreshold= {0.5}
            onEndReached = {() => {
              if (this.page < this.totalPages){
                this._loadFilms()
              }
            //   console.log("onEndReached")

            }}
          />
           {this._displayLoading()}
        </View>

    )
  }
}

const styles = StyleSheet.create({
  main_container: {
    flex: 1,
    //marginTop: 10,

  },
  textinput: {
    marginLeft:10,
    marginTop:20,
    marginRight:10,
    height: 45,
    borderColor: '#000000',
    borderWidth: 1,
    paddingLeft: 10
 },
 loading_container: {
   position: 'absolute',
   left: 0,
   right: 0,
   top: 50,
   bottom: 0,
   alignItems: 'center',
   justifyContent: 'center'
 }

})

const mapStateToProps = state => {
  return {
    favoritesFilm: state.favoritesFilm
  }
}
export default connect(mapStateToProps)(Search)
