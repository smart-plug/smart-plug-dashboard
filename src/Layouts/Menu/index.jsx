import React from 'react';
import {
  VerticalNavigation,
  VerticalSection,
  VerticalItem,
} from 'react-rainbow-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Application } from 'react-rainbow-components';
import {
  faClock,
  faCog,
  faFolderOpen,
  faBook,
  faReceipt,
  faArrowTrendUp,
} from '@fortawesome/free-solid-svg-icons';
import Header from '../../Components/Header';
import '@material/web/button/tonal-button';
import '@material/web/button/text-button';
import './index.css';

// const Button: React.FC = ({ image, value, children, selected }) => {
//   return selected ? (
//     <md-tonal-button>
//       {children}
//       {value}
//     </md-tonal-button>
//   ) : (
//     <md-text-button>
//       {children}
//       {value}
//     </md-text-button>
//   );
// };

class VerticalNavigationWithIcons extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedItem: 'item 5',
    };
    this.handleOnSelect = this.handleOnSelect.bind(this);
  }

  handleOnSelect(event, selectedItem) {
    return this.setState({ selectedItem });
  }

  render() {
    const { selectedItem } = this.state;
    const theme = {
      rainbow: {
        palette: {
          brand: '#6750A4',
        },
      },
    };

    return (
      <Application theme={theme} style={null}>
        <VerticalNavigation
          selectedItem={selectedItem}
          onSelect={this.handleOnSelect}
        >
          <VerticalSection>
            <VerticalItem
              name="item-1"
              label="Folders"
              icon={<FontAwesomeIcon icon={faArrowTrendUp} color="#6750A4" />}
            />
            <VerticalItem
              className="VerticalItem"
              name="item-2"
              label="Recents"
              color="#6750A4"
              icon={<FontAwesomeIcon icon={faClock} color="#6750A4" />}
            />
          </VerticalSection>
        </VerticalNavigation>
      </Application>
    );
  }
}

const Menu: React.FC = () => {
  return (
    <div className="Menu">
      <Header>
        <div>
          <h1>tomada</h1>
          <h1>inteligente</h1>
        </div>
      </Header>
      {/* <div className="Buttons">
        <Button value="Relatórios" selected={true}>
          <svg
            width="16"
            height="11"
            viewBox="0 0 16 11"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M15.44 1.24083C15.3639 1.04739 15.2183 0.893668 15.035 0.813333C14.9448 0.772768 14.848 0.751251 14.75 0.75H11C10.8011 0.75 10.6103 0.833408 10.4697 0.981874C10.329 1.13034 10.25 1.3317 10.25 1.54167C10.25 1.75163 10.329 1.95299 10.4697 2.10146C10.6103 2.24993 10.8011 2.33333 11 2.33333H12.9425L8.75002 6.75875L6.28252 4.14625C6.21279 4.07205 6.12984 4.01315 6.03845 3.97296C5.94705 3.93277 5.84902 3.91208 5.75002 3.91208C5.65101 3.91208 5.55298 3.93277 5.46158 3.97296C5.37019 4.01315 5.28724 4.07205 5.21751 4.14625L0.717515 8.89625C0.647219 8.96985 0.591423 9.0574 0.553347 9.15388C0.51527 9.25035 0.495667 9.35382 0.495667 9.45833C0.495667 9.56284 0.51527 9.66632 0.553347 9.76279C0.591423 9.85926 0.647219 9.94682 0.717515 10.0204C0.787237 10.0946 0.870188 10.1535 0.961583 10.1937C1.05298 10.2339 1.15101 10.2546 1.25002 10.2546C1.34902 10.2546 1.44705 10.2339 1.53845 10.1937C1.62984 10.1535 1.71279 10.0946 1.78252 10.0204L5.75002 5.82458L8.21751 8.43708C8.28724 8.51128 8.37019 8.57018 8.46158 8.61037C8.55298 8.65056 8.65101 8.67126 8.75002 8.67126C8.84902 8.67126 8.94705 8.65056 9.03845 8.61037C9.12984 8.57018 9.21279 8.51128 9.28252 8.43708L14 3.44958V5.5C14 5.70996 14.079 5.91133 14.2197 6.05979C14.3603 6.20826 14.5511 6.29167 14.75 6.29167C14.9489 6.29167 15.1397 6.20826 15.2803 6.05979C15.421 5.91133 15.5 5.70996 15.5 5.5V1.54167C15.4988 1.43821 15.4784 1.33601 15.44 1.24083Z"
              fill="#6750A4"
            />
          </svg>
        </Button>
        <Button value="Dispositivos" />
        <Button value="Configurações" />
      </div> */}
      <VerticalNavigationWithIcons />
    </div>
  );
};

export default Menu;
