import { Typography } from "@mui/material";
import { IconType } from "react-icons/lib";

interface infoProp {
  label?: string;
  info: string;
}

export function Info({ label, info }: infoProp) {
  return (
    <div className='infos'>
      <Typography className='label'>{label}</Typography>
      <Typography className='info'>{info}</Typography>
    </div>
  )
}

interface SimpleInfoProp {
  children?: React.ReactNode;
  Icon: IconType;
}

export function SimpleInfo({ Icon, children }: SimpleInfoProp) {
  return (
    <Typography variant='body2' className='info' sx={{ display: 'flex', alignItems: 'center', marginTop: '.5rem' }}>
      <Icon size={16} style={{ marginRight: '0.5rem' }} />{children}
    </Typography>
  )
}