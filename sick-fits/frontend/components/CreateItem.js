import React, { Component } from 'react';
import { Mutation } from 'react-apollo';
import Router from 'next/router';
import gql from 'graphql-tag';
import Form from './styles/Form';
import ErrorMessage from './ErrorMessage';
import formatMoney from '../lib/formatMoney';

const CREATE_ITEM_MUTATION = gql`
    mutation CREATE_ITEM_MUTATION(
        $title: String!
        $description: String!
        $price: Int!
        $image: String
        $largeImage: String
    ) {
        createItem(
            title: $title
            description: $description
            price: $price
            image: $image
            largeImage: $largeImage
        ) {
            id
            title
        }
    }
`;

class CreateItem extends Component {

    state = {
        title: '',
        description: '',
        image: '',
        largeImage: '',
        price: 1000,
    };

    handleChange = e => {
        const { name, type, value } = e.target;
        const formattedValue = type === 'number' ? parseFloat(value) : value;

        this.setState({ [name]: formattedValue });
    };

    render() {
        return (
            <Mutation mutation={CREATE_ITEM_MUTATION} variables={this.state}>
                {(createItem, { loading, error }) => (
                    <Form onSubmit={async (e) => {
                        e.preventDefault();

                        const result = await createItem();

                        Router.push({
                            pathname: '/item',
                            query: { id: result.data.createItem.id },
                        });
                    }}>
                        <h2>Sell an Item</h2>
                        <ErrorMessage error={error} />
                        <fieldset disabled={loading} aria-busy={loading}>
                            <label htmlFor="title">
                                Title
                                <input type="text" id="title" name="title" placeholder="Title" required value={this.state.title} onChange={this.handleChange} />
                            </label>
                            <label htmlFor="price">
                                Price
                                <input type="number" id="price" name="price" placeholder="Price" required value={this.state.price} onChange={this.handleChange} />
                            </label>
                            <label htmlFor="description">
                                Description
                                <textarea id="description" name="description" placeholder="Description" required value={this.state.description} onChange={this.handleChange} />
                            </label>
                            <button type="submit">Submit</button>
                        </fieldset>
                    </Form>
                )}
            </Mutation>
        );
    }

}

export default CreateItem;