// components
import Iconify from '@/components/Iconify'
import { IconButtonAnimate } from '@/components/animate'
// hooks
import useSettings from '@/hooks/useSettings'

export default function SettingMode() {
  const { themeMode, onChangeMode } = useSettings()

  return (
    <>
      <IconButtonAnimate
        onClick={onChangeMode}
        sx={{
          width: 40,
          height: 40,
        }}
      >
        <Iconify
          icon={themeMode !== 'light' ? 'ph:sun-duotone' : 'ph:moon-duotone'}
          width={20}
          height={20}
        />
      </IconButtonAnimate>
    </>
  )
}
