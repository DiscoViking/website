import Snackbar from "@material-ui/core/Snackbar";
import * as React from "react";
import {Dispatch} from "redux";

import { connect } from "react-redux";
import { CloseToast, ICloseToastAction } from "../state/actions";
import { IAppState } from "../state/model";

interface IStateProps {
  isOpen: boolean;
  text: string;
}

interface IDispatchProps {
  closeToast: () => void;
}

interface IOwnProps {
  duration: number;
}

type IToasterProps = IStateProps & IDispatchProps & IOwnProps;

const UnconnectedToaster: React.SFC<IToasterProps> = (props) => {
    return (
      <Snackbar
        open={props.isOpen}
        message={props.text}
        autoHideDuration={props.duration}
        onClose={props.closeToast}
      />
    );
};

const mapStateToProps = (state: IAppState) => ({
  isOpen: state.toaster.open,
  text: state.toaster.text,
});

const mapDispatchToProps = (dispatch: Dispatch<ICloseToastAction>) => ({
  closeToast: () => dispatch(CloseToast()),
});

export const Toaster = connect(mapStateToProps, mapDispatchToProps)(UnconnectedToaster);
