import { FC } from 'react'
import { ICharacterCreateForm } from '../../types'

interface IProps {
	color: string
	dimension: string
}

export const CharacterSVG: FC<IProps> = ({ color, dimension }) => {
	return (
		<svg
			className={`w-[${dimension}px] h-[${dimension}px]`}
			viewBox='0 0 40 40'
			fill='none'
			xmlns='http://www.w3.org/2000/svg'
		>
			<g clipPath='url(#clip0_55_3402)'>
				<path
					d='M16.7105 4.14282C16.1281 4.32775 15.7672 4.51268 15.6277 4.6976C15.5703 4.77801 15.3406 4.9549 15.111 5.07549C14.5696 5.38907 13.6672 6.23329 13.3227 6.74787C13.093 7.10968 12.4204 8.48457 11.9938 9.49764C11.879 9.76297 11.8461 9.78709 11.7805 9.67453C11.4442 9.08759 11.1407 10.4464 11.2883 11.8534C11.3704 12.6575 11.477 12.8022 11.6821 12.4484C11.7641 12.3037 11.8543 12.1911 11.879 12.1911C11.9036 12.1911 11.9528 12.6333 11.9774 13.172C12.0348 14.362 12.1579 14.8123 12.7321 15.8092C13.2653 16.75 13.5934 17.3851 13.5934 17.4897C13.5934 17.5299 13.175 17.8032 12.6746 18.1007C10.6731 19.2746 10.0825 19.9017 10.1727 20.762L10.2137 21.1721L9.02429 21.6867C7.50673 22.3379 6.78486 22.7962 5.99737 23.6003C5.20168 24.4123 5.16886 24.4606 4.80793 25.337C4.64387 25.7309 4.37317 26.3581 4.20911 26.7279C4.04505 27.0897 3.79896 27.7571 3.6595 28.1913C3.41341 28.9712 3.39701 29.0114 2.88842 29.4455C2.39623 29.8717 2.10913 30.3219 2.10913 30.6516C2.10913 30.7239 1.91226 30.9893 1.67437 31.2466C1.19859 31.745 0.960702 32.1631 0.960702 32.4847C0.960702 32.6054 0.911484 32.6938 0.854063 32.6938C0.517738 32.6938 -0.0810842 33.9159 0.00914927 34.4144C0.189616 35.3471 1.4857 35.54 2.27319 34.7441C2.42905 34.5913 2.60131 34.4627 2.66694 34.4627C2.75717 34.4627 4.40598 34.937 4.4634 34.9772C4.4634 34.9772 4.41418 35.524 4.34036 36.1913C4.1845 37.5501 4.1763 40.726 4.32395 41.4175L4.41418 41.8195L3.9138 42.2858C3.6431 42.5351 3.42162 42.7924 3.42162 42.8486C3.42162 42.9049 3.55286 43.0818 3.71693 43.2346C3.88099 43.3793 4.06145 43.6044 4.12708 43.725C4.1927 43.8537 4.31575 43.9502 4.40598 43.9502C4.60285 43.9502 6.21065 45.2929 6.21065 45.4537C6.21065 45.6145 6.66182 46.0406 6.82588 46.0406C6.90791 46.0406 7.4247 46.4587 7.98251 46.9733C9.14734 48.0427 9.13914 48.0266 8.79461 49.0075C8.68797 49.3291 8.53211 49.9 8.45828 50.2859C8.38446 50.6718 8.27782 51.0899 8.21219 51.2266C8.10555 51.4598 7.75282 52.8105 7.63798 53.4779C7.60517 53.6548 7.51493 53.9281 7.4329 54.0809C7.34267 54.2337 7.27705 54.4829 7.27705 54.6437C7.27705 54.9894 6.95713 56.501 6.85869 56.6216C6.81768 56.6699 6.74385 57.0156 6.69463 57.3854C6.64541 57.7553 6.51416 58.4226 6.40752 58.8649C6.0712 60.2478 5.90714 61.1483 5.93995 61.3573C6.03018 61.8076 6.94892 62.3624 7.90048 62.5312C8.16297 62.5875 8.42547 62.6357 8.46649 62.6438C8.51571 62.6599 8.64695 63.5764 8.7782 64.7825C8.90125 65.9483 9.13093 68.0468 9.27859 69.4378C9.69694 73.273 9.71335 73.5946 9.46726 74.4228C9.07351 75.7414 9.02429 77.2449 9.32781 78.3786C9.38523 78.5635 9.38523 79.3273 9.33601 80.5494C9.25398 82.5113 9.23757 82.5997 8.73719 83.8701L8.54852 84.3525V89.8199C8.54852 95.9787 8.58953 95.448 7.84306 99.0983C7.62157 100.224 7.38369 101.213 7.32626 101.293C7.26064 101.374 7.06377 101.575 6.8833 101.727C6.55518 102.001 6.37471 102.282 5.538 103.834C5.21808 104.421 5.15246 104.606 5.22628 104.694C5.34113 104.831 5.2591 105.498 5.09504 105.756C4.96379 105.957 4.93918 106.471 5.05402 106.544C5.24269 106.656 7.9579 106.857 9.32781 106.857C10.5747 106.857 10.911 106.833 11.2145 106.72C11.7559 106.511 11.9528 106.294 11.9528 105.916V105.595L12.5024 105.643C12.97 105.675 13.1668 105.651 13.741 105.458C14.1184 105.338 14.4465 105.209 14.4793 105.177C14.5121 105.153 14.5531 104.662 14.5778 104.107C14.6188 103.183 14.6434 103.038 14.8649 102.604C15.0945 102.154 15.111 102.049 15.1766 100.714C15.2176 99.9426 15.2258 98.7848 15.2094 98.1415C15.1602 96.9114 15.2586 94.9415 15.4063 93.7998C15.4555 93.4219 15.6277 92.7224 15.7754 92.248C15.9559 91.6772 16.0543 91.2108 16.0543 90.9133C16.0543 90.5435 16.0871 90.4148 16.2266 90.2942C16.3578 90.1817 16.3906 90.0772 16.3578 89.8842C16.3332 89.7395 16.366 89.4661 16.4234 89.2731C16.6367 88.6621 16.9484 86.9495 17.0469 85.8801C17.1535 84.7143 17.0961 83.0982 16.9238 82.3103L16.8172 81.7876L17.1535 81.265C18.1625 79.7052 18.4742 78.1776 18.2937 75.5806C18.2363 74.8328 18.2445 74.2459 18.3183 73.5705C18.3758 73.0398 18.425 72.4127 18.425 72.1795C18.4414 71.2227 18.5972 72.0026 18.9254 74.6238C19.3519 78.0168 21.0582 90.8973 21.3945 93.237C22.1328 98.431 23.3304 105.49 23.5273 105.868C23.7652 106.327 24.1589 106.68 24.4132 106.648C24.7331 106.616 24.9956 106.053 24.9956 105.418C24.9956 104.558 24.6839 101.133 24.0605 94.9656C23.5847 90.3505 23.0269 83.9826 22.4117 76.2318C22.346 75.3474 22.1574 72.879 22.0015 70.7403C21.7226 66.8649 21.7226 66.8569 21.8785 66.5996C21.9687 66.4549 22.0425 66.2297 22.0425 66.085C22.0425 65.8518 22.0835 65.8116 22.4281 65.6589C22.6413 65.5704 22.8382 65.5222 22.871 65.5543C23.0269 65.7152 24.6183 70.4589 24.9136 71.6569C25.2253 72.8871 25.2499 73.072 25.2007 73.6509C25.053 75.3956 25.2581 76.3846 26.0702 77.7353C26.2425 78.0168 26.3491 78.3303 26.3983 78.6841C26.4312 78.9735 26.546 79.8017 26.6444 80.5334C26.7839 81.5947 26.8249 82.3263 26.8413 84.2721L26.8577 86.6842L27.194 88.1314C28.7772 94.9013 28.8593 95.4561 28.9167 99.6209C28.9413 101.8 28.9249 102.548 28.851 102.684C28.769 102.829 28.769 103.046 28.8428 103.649C28.8921 104.083 28.9741 104.493 29.0151 104.574C29.2202 104.952 31.0084 105.161 32.0995 104.936C32.3373 104.879 32.3702 104.903 32.608 105.321C32.9608 105.933 33.133 105.981 34.708 105.908C36.6521 105.82 39.3756 105.531 39.8349 105.362C39.999 105.305 40.0236 105.257 39.9826 105.008C39.958 104.847 39.8841 104.662 39.8267 104.598C39.7775 104.534 39.7201 104.341 39.7201 104.172C39.7119 103.979 39.6216 103.738 39.474 103.512C39.3263 103.311 39.2279 103.046 39.2197 102.877C39.2033 102.58 38.8916 101.912 38.5799 101.494C38.4896 101.366 38.0877 101.028 37.7021 100.755C36.7916 100.095 36.6439 99.8943 36.6439 99.3154C36.6439 98.8008 36.4143 98.0853 36.1271 97.7074C35.9385 97.4662 35.6514 96.3968 35.3971 95.046C35.2822 94.4511 35.2658 91.9345 35.3397 87.1666C35.3807 84.3846 35.3725 84.3766 34.7162 82.5595C34.2815 81.3856 34.0354 80.4851 33.9369 79.7213C33.8549 79.0942 33.8549 78.9735 34.0026 78.5153C34.2651 77.6871 34.3553 76.9313 34.3307 75.9102C34.3225 75.3796 34.3225 74.6881 34.3389 74.3826C34.3635 73.9001 34.3389 73.7474 34.142 73.3373C33.9533 72.9353 33.9123 72.7343 33.9041 72.0911C33.8877 71.4157 33.8549 71.2549 33.6334 70.7805L33.3709 70.2418L33.3627 66.2056C33.3463 63.3272 33.3709 62.097 33.4366 61.9282C33.494 61.7995 33.5186 61.6468 33.494 61.5825C33.4694 61.5181 33.5842 61.4136 33.7975 61.3091C33.9862 61.2126 34.2487 61.0598 34.3717 60.9714C34.6014 60.8186 34.6014 60.8106 34.5522 60.1995C34.5194 59.8618 34.4455 59.4759 34.3881 59.3473C34.3061 59.1382 34.0354 58.093 33.7893 56.9754C33.7401 56.7744 33.535 56.0668 33.3217 55.4075C33.1002 54.7241 32.9362 54.0729 32.9444 53.896C32.9526 53.7352 32.9198 53.5261 32.8705 53.4377C32.6737 53.0759 32.0502 50.9372 32.0913 50.7603C32.1241 50.6477 31.9436 50.0206 31.5991 49.0638C31.2299 48.0105 31.0659 47.4396 31.0823 47.2065C31.0823 47.0055 31.0413 46.7884 30.9592 46.6758C30.8772 46.5713 30.8198 46.4266 30.8198 46.3542C30.8198 46.2095 32.2225 45.1321 32.5424 45.0356C32.6491 45.0034 32.9936 44.714 33.3217 44.3924C33.9041 43.8215 34.6506 43.2426 35.3725 42.7924C35.8154 42.527 36.1928 42.0205 36.1107 41.8034C36.0861 41.723 35.8154 41.4577 35.5201 41.2165L34.9787 40.7662L34.9541 38.2818C34.9459 36.9069 34.9213 35.6446 34.9049 35.4677L34.8803 35.1461L35.2904 35.1059C35.5201 35.0818 35.8893 34.9692 36.1107 34.8566C36.3404 34.7441 36.7752 34.5913 37.0951 34.5109C37.4068 34.4385 37.8334 34.2697 38.0467 34.133C38.506 33.8516 39.0228 33.3129 39.0228 33.128C39.0228 33.0637 38.7521 32.6858 38.424 32.2837C38.0549 31.8496 37.8252 31.5038 37.8252 31.3913C37.8334 31.2707 37.7596 31.1742 37.6119 31.1099C37.4889 31.0455 37.1361 30.7239 36.8162 30.3862C36.2994 29.8315 36.2502 29.7511 36.2912 29.5018C36.324 29.333 36.3076 29.2365 36.242 29.2365C36.1928 29.2365 35.8236 28.9068 35.4381 28.5048C34.7983 27.8536 34.7244 27.749 34.749 27.5078C34.7654 27.2747 34.7326 27.2184 34.5194 27.1139C34.3389 27.0174 34.2569 26.9128 34.2322 26.7199C34.0682 25.6666 34.0108 25.4254 33.8877 25.1762C33.8139 25.0154 33.6826 24.8385 33.6006 24.7822C33.5104 24.7259 33.3873 24.4847 33.3135 24.2515C33.2151 23.9138 33.0838 23.7289 32.7229 23.3912C31.7385 22.4827 30.6803 21.8957 28.728 21.2123C28.0554 20.9791 27.3909 20.754 27.2515 20.7218C27.03 20.6736 27.0054 20.6414 27.0136 20.352C27.0218 20.1751 27.0792 19.8615 27.1366 19.6525C27.2597 19.1942 27.1612 18.8887 26.8659 18.8485C26.7593 18.8324 26.669 18.76 26.6526 18.6635C26.6362 18.5751 26.5788 18.4545 26.5296 18.3982C26.4312 18.2776 25.2909 17.7389 25.1269 17.7389C25.0694 17.7389 24.8234 17.6022 24.5773 17.4253C24.3312 17.2565 23.9784 17.0394 23.7898 16.9429C23.5929 16.8464 23.437 16.7419 23.437 16.7178C23.437 16.6856 23.6093 16.2434 23.8226 15.7288L24.1999 14.8042L24.2573 13.3811C24.2984 12.0223 24.3558 11.6846 24.4706 11.9821C24.5445 12.175 24.7085 12.1429 24.8152 11.9097C24.9628 11.6042 24.9382 11.3389 24.7085 10.6635C24.5937 10.3338 24.487 9.96397 24.4624 9.83533C24.4378 9.71473 24.3722 9.61825 24.3148 9.61021C24.2655 9.61021 23.9948 9.16799 23.7241 8.63733C23.0269 7.25441 22.5593 6.59511 21.7472 5.8554C21.2386 5.38103 20.8367 5.09962 20.2953 4.82625C19.8769 4.6172 19.4668 4.38403 19.3765 4.30363C19.2699 4.20715 18.9746 4.13479 18.5152 4.07851C17.5801 3.9579 17.2437 3.97398 16.7105 4.14282Z'
					fill={color}
				/>
				<circle cx='20' cy='20' r='19.5' stroke={color} />
			</g>
			<defs>
				<clipPath id='clip0_55_3402'>
					<rect width='40' height='40' rx='20' fill={color} />
				</clipPath>
			</defs>
		</svg>
	)
}
