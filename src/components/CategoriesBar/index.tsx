import styles from './CategoriesBar.module.scss';
import { IconContext } from 'react-icons';
import categories from './categories.json';
import { findIcon } from '../../utils/Icons';

interface CategoriesBarProps {
    category: number | null;
    setCategory: React.Dispatch<React.SetStateAction<number | null>>;
}

type ICategory = typeof categories[0];

export default function CategoriesBar({ category, setCategory }: CategoriesBarProps) {

    function selectCategory(selectedCategory: ICategory) {
		if (category === selectedCategory.id) return setCategory(null);
		return setCategory(selectedCategory.id);
	}
  
    return (
        <section>
            <p className={styles.titulo}>Categorias</p>
            <IconContext.Provider value={{ size: '28', }}>
                <div className={styles.categorias}>
                    {categories.map(categoria => (
                        <span key={categoria.id} className={ category === categoria.id ? `${styles.categoria__active}` : `${styles.categoria}`}>
                            <div className={styles.categoria__icon} onClick={() => selectCategory(categoria)}>
                                {findIcon(categoria.icon)}
                            </div>
                            <p className={styles.categoria__nome}>{categoria.name}</p>
                        </span>
                    ))}
                </div>
            </IconContext.Provider>
        </section>
    )
}