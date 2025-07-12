import axios from 'axios';
import _uniqBy from 'lodash/uniqBy';

const _defaultMessage = 'Search for the movie title!'

export default {
  namespaced: true, // modules를 사용할 때는 true로 설정
  state: () => ({
    movies: [], // 영화 데이터를 저장할 상태
    message: _defaultMessage, // 메시지를 저장할 상태
    loading: false,
    theMovie: {} // 선택된 영화 데이터를 저장할 상태
  }), // 상태를 정의
  getters: {}, // 계산된 상태
  mutations: {
    updateState(state, payload) {
      Object.keys(payload).forEach(key => {
        state[key] = payload[key]; // payload의 각 키에 대해 상태를 업데이트
      }) // 상태를 업데이트하는 메소드
    },
    resetMovies(state) {
      state.movies = []; // 영화 데이터를 초기화하는 메소드
      state.message = _defaultMessage;
      state.loading = false;
    }
  }, // 상태를 변경하는 메소드
  actions: {
    async searchMovies({
      state,
      commit
    }, payload) {
      if (state.loading) return; // 이미 로딩 중이면 중단
      commit('updateState', {
        message: '', // 메시지를 로딩 중으로 변경
        loading: true // 로딩 상태를 true로 설정
      });
      try {

        const res = await _fetchMovie({
          ...payload,
          page: 1
        }); // _fetchMovie 함수를 호출하여 영화 데이터를 가져옴
        const {
          Search,
          totalResults
        } = res.data; // 응답 데이터에서 Search와 totalResults를 추출
        commit('updateState', {
          movies: _uniqBy(Search, 'imdbID')
        })

        const total = parseInt(totalResults, 10); // totalResults를 정수로 변환
        const pageLength = Math.ceil(total / 10); // 페이지 길이를 계산

        if (pageLength > 1) {
          for (let page = 2; page <= pageLength; page++) {
            if (page > payload.number / 10) {
              break; // 요청한 페이지 수가 전체 페이지 수를 초과하면 반복을 중단
            }
            const res = await _fetchMovie({
              ...payload,
              page
            }); // 다음 페이지의 영화 데이터를 가져옴
            const {
              Search
            } = res.data; // 각 페이지의 Search 데이터를 추출
            commit('updateState', {
              movies: [...state.movies, ..._uniqBy(Search, 'imdbID')] // 기존 영화 데이터에 새로운 데이터를 추가
            });
          }
        }
      } catch (message) {
        commit('updateState', {
          movies: [], // 에러 발생 시 영화 데이터를 초기화
          message // 에러 메시지를 상태에 저장
        })
      } finally {
        commit('updateState', {
          loading: false
        });
      };
    },
    async searchMovieWithID({ state, commit }, payload) {
      if (state.loading) return; // 이미 로딩 중이면 중단
      commit('updateState',{
        theMovie: {}, // 선택된 영화 데이터를 초기화
        loading: true
      })
      try {
        const res = await _fetchMovie(payload)
        commit('updateState', {
          theMovie: res.data // 영화 데이터를 상태에 저장
        });
      } catch (error) {
        commit('updateState', {
          theMovie: {}, // 에러 발생 시 영화 데이터를 초기화
        });
      } finally {
        commit('updateState', {
          loading: false // 로딩 상태를 false로 설정
        });
      }
    } // 비동기 작업을 처리하는 메소드
  }
}

function _fetchMovie(payload) {
  const {
    title,
    type,
    year,
    page,
    id
  } = payload;
  const OMDB_API_KEY = '7035c60c';
  const url = id ?
    `https://www.omdbapi.com/?apikey=${OMDB_API_KEY}&i=${id}` :
    `https://www.omdbapi.com/?apikey=${OMDB_API_KEY}&s=${title}&type=${type}&y=${year}&page=${page}`;

  return new Promise((resolve, reject) => {
    axios.get(url)
      .then(res => {
        if (res.data.Error) {
          reject(res.data.Error); // 에러가 발생하면 reject
        }
        resolve(res);
      })
      .catch(err => {
        reject(err.message);
      })
  });

}