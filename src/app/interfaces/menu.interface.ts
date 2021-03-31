export interface IMenuItem {
  title: string
  icon: string
  submenu: ISubMenuItem[]
}
export interface ISubMenuItem {
  title: string
  url: string
}
