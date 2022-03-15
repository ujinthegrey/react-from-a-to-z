import React from 'react'
import MyInput from './UI/input/MyInput'
import MySelect from './UI/select/MySelect'

const PostFilter = ({filter, setFilter}) => {
    return (
        <div>
            <MyInput
            value={filter.queryTitle}
            onChange={e => setFilter({...filter, queryTitle: e.target.value})}
            placeholder="Search title..."          
            />
            {filter.queryTitle
            ?  
                <MyInput disabled    
                placeholder="Search text..."
                value=''          
                />
            :   
                <MyInput
                value={filter.queryBody}
                onChange={e => setFilter({...filter, queryBody: e.target.value})}
                placeholder="Search text..."          
            />

            }      
            <MySelect
            value={filter.sort}
            onChange={selectedSort => setFilter({...filter, sort: selectedSort})}
            defaultValue="Sort"
            options={[
                {value: 'title', name: 'by title' },
                {value: 'body', name: 'by text' }
            ]}
            />
        </div>
    )
}

export default PostFilter