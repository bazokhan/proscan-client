import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => {
  // console.log({ theme });
  return {
    "@global": {
      body: {
        backgroundColor: theme.palette.common.white
      }
    },
    appBar: {
      position: "relative"
    },
    main: {
      marginTop: theme.spacing(8),
      display: "flex",
      flexDirection: "column",
      alignItems: "center"
    },
    section: props => ({
      width: "100%",
      // display: "flex",
      padding: theme.spacing(1)
      // backgroundColor: "red"
      // flexDirection: props.flexDirection
    }),
    rowFlexStart: {
      display: "flex",
      justifyContent: "flex-start",
      alignItems: "center"
    },
    rowFlexEnd: {
      display: "flex",
      justifyContent: "flex-end",
      alignItems: "center"
    },
    rowCenter: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center"
    },
    rowSpaceBetween: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center"
    },
    rowSpaceAround: {
      display: "flex",
      justifyContent: "space-around",
      alignItems: "center"
    },
    columnFlexStart: {
      display: "flex",
      flexDirection: "column",
      alignItems: "flex-start",
      justifyContent: "center"
    },
    columnFlexEnd: {
      display: "flex",
      flexDirection: "column",
      alignItems: "flex-end",
      justifyContent: "center"
    },
    columnCenter: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center"
    },
    columnSpaceBetween: {
      display: "flex",
      flexDirection: "column",
      alignItems: "space-between",
      justifyContent: "center"
    },
    columnSpaceAround: {
      display: "flex",
      flexDirection: "column",
      alignItems: "space-around",
      justifyContent: "center"
    },
    borderBottom: {
      borderBottom: "solid 1px #ddd",
      marginBottom: theme.spacing(2)
    },
    // paper: {
    //   marginTop: theme.spacing(8),
    //   display: "flex",
    //   flexDirection: "column",
    //   alignItems: "center"
    // },
    fab: {
      marginTop: theme.spacing(1)
    },
    paperCard: {
      marginTop: theme.spacing(3),
      marginBottom: theme.spacing(3),
      padding: theme.spacing(2),
      [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
        marginTop: theme.spacing(6),
        marginBottom: theme.spacing(6),
        padding: theme.spacing(3)
      }
    },
    avatar: {
      margin: theme.spacing(1),
      backgroundColor: theme.palette.secondary.main
    },
    form: {
      width: "100%", // Fix IE 11 issue.
      marginTop: theme.spacing(1)
    },
    submit: {
      margin: theme.spacing(3, 0, 2)
    }
  };
});

console.log({ useStyles });

export { useStyles };
