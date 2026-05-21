import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';

import styles from './ArticleParamsForm.module.scss';
import React, { useEffect, useRef, useState } from 'react';
import { clsx } from 'clsx';
import { Select } from 'src/ui/select';
import {
	ArticleStateType,
	backgroundColors,
	contentWidthArr,
	defaultArticleState,
	fontColors,
	fontFamilyOptions,
	fontSizeOptions,
} from 'src/constants/articleProps';
import { RadioGroup } from 'src/ui/radio-group';
import { Separator } from 'src/ui/separator';
import { Text } from 'src/ui/text';

type ArticleParamsFormProps = {
	appState: ArticleStateType;
	setAppState: React.Dispatch<React.SetStateAction<ArticleStateType>>;
};

export const ArticleParamsForm = (props: ArticleParamsFormProps) => {
	const asideRef = useRef<HTMLElement>(null);

	const [isOpen, setIsOpen] = useState(false);

	const closeForm = () => {
		setIsOpen(false);
	};

	const [fontFamilyOption, setFontFamilyOption] = useState(
		props.appState.fontFamilyOption
	);

	const [fontSizeOption, setFontSizeOption] = useState(
		props.appState.fontSizeOption
	);

	const [fontColor, setFontColor] = useState(props.appState.fontColor);

	const [backgroundColor, setBackgroundColor] = useState(
		props.appState.backgroundColor
	);

	const [contentWidth, setContentWidth] = useState(props.appState.contentWidth);

	useEffect(() => {
		if (!isOpen) return;

		const handleClickOutside = (e: MouseEvent) => {
			const target = e.target as Node;
			if (asideRef.current && !asideRef.current.contains(target)) {
				setIsOpen(false);
			}
		};

		document.addEventListener('mousedown', handleClickOutside);

		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, [isOpen]);

	const handleReset = (e: React.FormEvent) => {
		e.preventDefault();
		props.setAppState(defaultArticleState);
		setFontFamilyOption(defaultArticleState.fontFamilyOption);
		setFontSizeOption(defaultArticleState.fontSizeOption);
		setFontColor(defaultArticleState.fontColor);
		setBackgroundColor(defaultArticleState.backgroundColor);
		setContentWidth(defaultArticleState.contentWidth);
		closeForm();
	};

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		props.setAppState({
			fontFamilyOption,
			fontSizeOption,
			fontColor,
			backgroundColor,
			contentWidth,
		});
		closeForm();
	};

	return (
		<>
			<ArrowButton
				isOpen={isOpen}
				onClick={() => {
					setIsOpen((old) => !old);
				}}
			/>
			<aside
				className={clsx(styles.container, isOpen && styles.container_open)}
				ref={asideRef}>
				<form className={styles.form}>
					<Text size={31} weight={800} family={'open-sans'} uppercase={true}>
						Задайте параметры
					</Text>
					<Select
						selected={fontFamilyOption}
						options={fontFamilyOptions}
						title={'Шрифт'}
						onChange={(selected) => {
							setFontFamilyOption(selected);
						}}
					/>
					<RadioGroup
						name={'fontSize'}
						selected={fontSizeOption}
						options={fontSizeOptions}
						title={'Размер шрифта'}
						onChange={(value) => {
							setFontSizeOption(value);
						}}
					/>
					<Select
						selected={fontColor}
						options={fontColors}
						title={'Цвет шрифта'}
						onChange={(selected) => {
							setFontColor(selected);
						}}
					/>
					<Separator />
					<Select
						selected={backgroundColor}
						options={backgroundColors}
						title={'Цвет фона'}
						onChange={(selected) => {
							setBackgroundColor(selected);
						}}
					/>
					<Select
						selected={contentWidth}
						options={contentWidthArr}
						title={'Ширина контента'}
						onChange={(selected) => {
							setContentWidth(selected);
						}}
					/>
					<div className={styles.bottomContainer}>
						<Button
							title='Сбросить'
							htmlType='reset'
							type='clear'
							onClick={handleReset}
						/>
						<Button
							title='Применить'
							htmlType='submit'
							type='apply'
							onClick={handleSubmit}
						/>
					</div>
				</form>
			</aside>
		</>
	);
};
