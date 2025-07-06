import topIcon from "@/public/roles/Top_icon.webp"
import jungleIcon from "@/public/roles/Jungle_icon.webp"
import midIcon from "@/public/roles/Middle_icon.webp"
import bottomIcon from "@/public/roles/Bottom_icon.webp"
import supportIcon from "@/public/roles/Support_icon.webp"

export const top = {
    op: "top",
    roleId: "TOP",
    icon: topIcon,
}

export const jungle = {
    op: "jungle",
    roleId: "JUNGLE",
    icon: jungleIcon,
}

export const mid = {
    op: "mid",
    roleId: "MIDDLE",
    icon: midIcon,
}

export const adc = {
    op: "adc",
    roleId: "BOTTOM",
    icon: bottomIcon,
}
export const supp = {
    op: "support",
    roleId: "UTILITY",
    icon: supportIcon,
}

export const roles = [
    top, jungle, mid, adc, supp
]

export const rolesObj = {
    TOP : top,
    JUNGLE: jungle,
    MIDDLE: mid,
    BOTTOM: adc,
    UTILITY: supp,
}
