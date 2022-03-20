import { useState, useEffect, MouseEventHandler } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { 
    updateAntName, 
    updateAntLikelihood, 
    updateAntCalculatedStatus,
    clearAnts,
 } from '../../redux/actions/AntActions';
import Table from 'rc-table';
import Header from '../Header/Header';
import HandlerButton from '../HandlerButton/HandlerButton';
import { tableConfig } from '../../constants/tableConfig';
import { IAntState } from '../../redux/reducers/AntReducer';
import { IAppState } from '../../redux/store/store';
import './AppGrid.css';

function AppGrid(props: {
    loadData: boolean
}) {
  interface ITableData {
    name: string
    length: number,
    color: string,
    weight: number,
    antState: string,
    likelihood: number,
  };

  const { loadData } = props;

  const dispatch = useDispatch();
  const [raceStarted, setRaceStarted] = useState<boolean>(false);
  const [tableData, setTableData] = useState<Array<ITableData> | undefined>(undefined);
  const { tableColumns, initAntData } = tableConfig;

  const antsInStore = useSelector((state: IAppState) => state.antState);


  const isTableDoneCalculating = (table: Array<ITableData> | undefined) => {
    return table?.every((ant: ITableData) => ant.antState === 'CALCULATED');
  }

  const startRaceHandler: MouseEventHandler<HTMLButtonElement> = () => {
    setRaceStarted(true);
  };

  const populateAntsInStore = (antsInStore: Array<IAntState>) => {
    tableData?.forEach(ant => {
        const antIndex = antsInStore.findIndex(antObj => antObj.name === ant.name);
        if (antIndex === -1) {
            dispatch(updateAntName(ant.name));
            dispatch(updateAntLikelihood(ant.name));
        }
    });
  };

  const checkAndApplyLocalUpdates = (antsInStore: Array<IAntState>) => {
    if (Array.isArray(tableData) && tableData.length > 0) {
        const cloneArray = JSON.parse(JSON.stringify(tableData));
        antsInStore?.forEach(ant => {
            const antIndex = tableData?.findIndex(antObj => antObj.name === ant.name);
            if (antIndex !== -1 && cloneArray[antIndex].antState !== 'CALCULATED') {
                cloneArray[antIndex].antState = ant.antLoadingState;
                if (ant.likelihood) {
                    cloneArray[antIndex].likelihood = ant.likelihood;
                    dispatch(updateAntCalculatedStatus(ant.name));
                }
            }
        });

        setTableData(cloneArray);

        if (isTableDoneCalculating(cloneArray)) {
            setRaceStarted(false);
        }
    }
  };

  useEffect(() => {
    if (loadData && !tableData) {
        setTableData(initAntData);
    }

    if (raceStarted) {
        const emptyStore = Array.isArray(antsInStore) && antsInStore.length < 1;
        
        if (emptyStore) {
            populateAntsInStore(antsInStore);
        }

        if (!emptyStore && isTableDoneCalculating(tableData)) {
            setTableData(initAntData);
            dispatch(clearAnts());
        }

        checkAndApplyLocalUpdates(antsInStore);
    }
  });

  const title = 'RACE-ANTS';
  const headerSize = 'medium';
  const buttonTitle = 'START RACE';
  const disableRaceButton = (!loadData && !raceStarted) || (loadData && raceStarted);

  return (
    <>
      <Header
        title = {title}
        size = {headerSize}
      />
      <HandlerButton
        handler = {startRaceHandler}
        disabled = {disableRaceButton}
        buttonTitle = {buttonTitle}
      />
      <Table
        columns = {tableColumns}
        data = {tableData}
      />
    </>
  );
}

export default AppGrid;
