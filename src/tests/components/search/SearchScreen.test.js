import { mount } from "enzyme";
import { MemoryRouter, Route } from "react-router-dom";
import { SearchScreen } from "../../../components/search/SearchScreen";

describe('Pruebas en <SearchScreen />', () => {
  test('debe de mostrarse correctamente con valores por defecto', () => {
    const wrapper = mount(
      <MemoryRouter initialEntries={['/search']}>
        <Route path="/search" component={ SearchScreen }/>
      </MemoryRouter>
    );
    
    expect(wrapper).toMatchSnapshot();
    expect(wrapper.find('.alert-info').text().trim()).toBe('Search a hero');
  });
  
  test('debe de mostrar a batman y el input con el valor del query string', () => {
    const wrapper = mount(
      <MemoryRouter initialEntries={['/search?q=batman']}>
        <Route path="/search" component={ SearchScreen }/>
      </MemoryRouter>
    );
    
    expect(wrapper.find('input').prop('value')).toBe('batman');
    expect(wrapper).toMatchSnapshot();
  });
  
  test('debe de mostrar un error si no se encuentra el hero', () => {
    const heroName = 'FiFiElPerritoFaldero'
    
    const wrapper = mount(
      <MemoryRouter initialEntries={[`/search?q=${heroName}`]}>
        <Route path="/search" component={ SearchScreen }/>
      </MemoryRouter>
    );
    
    expect(wrapper.find('.alert-danger').text().trim()).toBe(`There is no a hero with ${heroName}`)
    expect(wrapper).toMatchSnapshot();
  });
  
  test('debe de llamar el push del history', () => {
    const history = {
      push: jest.fn()
    }
    
    const wrapper = mount(
      <MemoryRouter initialEntries={[`/search`]}>
        <Route
          path="/search"
          component={ () => <SearchScreen history={ history }/> }
        />
      </MemoryRouter>
    );

    wrapper.find('input').simulate('change', {
      target: {
        name: 'searchText',
        value: 'batman'
      }
    });

    wrapper.find('form').prop('onSubmit')({
      preventDefault(){}
    });

    expect(history.push).toHaveBeenCalledWith('?q=batman')

  });
});